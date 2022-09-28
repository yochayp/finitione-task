<?php

namespace App\Utilities\Filter\TaskFilters;

use App\Utilities\Filter\QueryFilter;
use App\Utilities\Filter\FilterContract;

class Completed  extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $this->query->where('completed',$value=="true");
    }

}