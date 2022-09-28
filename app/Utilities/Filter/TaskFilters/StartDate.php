<?php

namespace App\Utilities\Filter\TaskFilters;
use Carbon\Carbon;

use App\Utilities\Filter\QueryFilter;
use App\Utilities\Filter\FilterContract;

class StartDate  extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $start = Carbon::parse($value);
        $this->query->whereDate('destination_date','>=',$start);
    }
}