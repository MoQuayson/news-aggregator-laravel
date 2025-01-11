<?php

namespace App\Models;

class ArticleFetchOptions{
    public string $query;
    public string $apiKey;
    public string $datePublished;
    public string $source;
    public string $author;

    // public function __construct($query = "",$apiKey = "",$datePublished,$source = "",$author = "")
    // {
    //     $this->query = $query;
    //     $this->apiKey = $apiKey;
    //     $this->datePublished = $datePublished ?? now()->toDateString();
    //     $this->source = $source;
    //     $this->author = $author;
    // }

    public function __construct($options = [])
    {
        $this->query = $options['search'] ?? "";
        $this->apiKey = $options['api_key'] ?? "";
        $this->datePublished = $options['published_date'] ?? now()->toDateString();
        $this->source = $options['source'] ?? "";
        $this->author = $options['author'] ?? "";
    }

}
