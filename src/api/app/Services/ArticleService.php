<?php

namespace App\Services;

use App\Http\Resources\ArticleResource;
use App\Models\ArticleFetchOptions;
use Illuminate\Support\Facades\Http;

const NY_TIMES_BASE_URL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
const OPEN_NEWS_BASE_URL = 'http://newsapi.org/v2/everything';
const THE_GUARDIAN_BASE_URL = 'http://content.guardianapis.com/search';

class ArticleService{

    public function getArticlesFromNYTimes(ArticleFetchOptions $options){
        if($options->datePublished == "" || $options->datePublished == null){
            $options->datePublished = now()->toDateString();
        }
        $url = NY_TIMES_BASE_URL ."?q={$options->query}&api-key={$options->apiKey}&fq=pub_date:({$options->datePublished})";
        $response = Http::get($url);

        if($response->status() == '200')
        {
            return ArticleResource::mapNYTimesResponse($response->json('response')["docs"]);
        }
        return array(
            'status'=>'error',
            'data'=>[]
        );
    }

    public function getArticlesFromOpenNews(ArticleFetchOptions $options){
        if($options->datePublished == "" || $options->datePublished == null){
            $options->datePublished = now()->toDateString();
        }
        $url = OPEN_NEWS_BASE_URL ."?q={$options->query}&apiKey={$options->apiKey}&from={$options->datePublished}&pageSize=10";
        $response = Http::get($url);

        if($response->status() == '200')
        {
            return ArticleResource::mapOpenNewsResponse($response->json('articles'));
        }
        return [];
    }

    public function getArticlesFromTheGuardian(ArticleFetchOptions $options){
        if($options->datePublished == "" || $options->datePublished == null){
            $options->datePublished = now()->toDateString();
        }
        $url = THE_GUARDIAN_BASE_URL ."?q={$options->query}&api-key={$options->apiKey}&from={$options->datePublished}&pageSize=10";
        $response = Http::get($url);

        if($response->status() == '200')
        {
            return ArticleResource::mapTheGuardianResponse($response->json('response')['results']);
        }
        return [];
    }
}
