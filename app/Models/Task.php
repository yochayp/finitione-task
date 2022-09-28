<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Utilities\Filter\FilterBuilder;
use App\Utilities\Restrictions\TaskRestrictions\DeleteRestriction;


class Task extends Model
{
    use HasFactory;

    public function scopeFilter($query){ 
        $namespace = 'App\Utilities\Filter\TaskFilters';
        $filter = new FilterBuilder($query, request()->filter, $namespace);
                
        return $filter->apply();
    }

    public function scopeOrder($query){
        $orderBy = 'id';
        $order = 'desc';
        if(isset( request()->orderBy)){
            $orderBy = request()->orderBy;
        }
        if(isset( request()->order)){
            $order = request()->order;
        }
        return $query->orderBy($orderBy,$order);
    }
    
    public function scopeCheckRestriction($query,$taskId){
        $restriction = new DeleteRestriction($query);
        return $restriction->checkRestriction($taskId);
    }
}
