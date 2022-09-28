<?php

namespace App\Utilities\Restrictions\TaskRestrictions;

use App\Utilities\Restrictions\QueryRestriction;
use Carbon\Carbon;

class DeleteRestriction  extends QueryRestriction
{           
    const DAYS_AHEAD_RESTRICTION = 6;

    public function checkRestriction($taskId)
    {
        $expDate = Carbon::now()->addDays(self::DAYS_AHEAD_RESTRICTION);
        
        return $this->query->where('id',$taskId)->whereDate('destination_date','>=',$expDate)->count();
    }
}