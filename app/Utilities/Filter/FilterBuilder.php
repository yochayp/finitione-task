<?php

namespace App\Utilities\Filter;

class FilterBuilder
{
    protected $query;
    protected $filters;
    protected $namespace;

    public function __construct($query, $filters='', $namespace)
    {
        $this->query = $query;
        $this->filters = $filters;
        $this->namespace = $namespace;
    }

    public function apply()
    {
        if (is_array($this->filters)) {
            foreach ($this->filters as $name => $value) {

                $normailizedName = ucfirst($name);
                $class = $this->namespace . "\\{$normailizedName}";

                if (! class_exists($class)) {
                    continue;
                }

                if (strlen($value)) {
                    (new $class($this->query))->handle($value);
                } else {
                    (new $class($this->query))->handle();
                }
            }
        }
        return $this->query;
    }
}