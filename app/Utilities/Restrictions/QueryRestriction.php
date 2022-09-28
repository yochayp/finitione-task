<?php

namespace App\Utilities\Restrictions;

abstract class QueryRestriction
{
    protected $query;

    public function __construct($query)
    {
        $this->query = $query;
    }
}