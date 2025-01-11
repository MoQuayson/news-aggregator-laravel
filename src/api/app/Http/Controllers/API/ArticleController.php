<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ArticleFetchOptions;
use App\Services\ArticleService;
use Illuminate\Http\Request;

const DATA_SOURCES_USED = ["OPEN_NEWS","NY_TIMES","GUARDIAN"];
class ArticleController extends Controller
{
    public function __construct(protected ArticleService $articleService)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $nyTimesArticles= [];
        $openNewsArticles= [];
        $guardianArticles= [];
        //source was specified
        if ($request->source != null || $request->source != '' ){
            //if source specified is part of the datasource being used
            //else we use open news only
            if (in_array($request->source,DATA_SOURCES_USED)){
                if ($request->source == 'NY_TIMES'){
                    //get news from NY Times
                    $request["api_key"] = env('NY_TIMES_API_KEY','');
                    $nyTimesArticles = $this->articleService->getArticlesFromNYTimes(new ArticleFetchOptions($request->all()));
                }

                else if ($request->source == 'OPEN_NEWS'){
                   //get news from OpenNews
                    $request["api_key"] = env('OPEN_NEWS_API_KEY','');
                    $openNewsArticles = $this->articleService->getArticlesFromOpenNews(new ArticleFetchOptions($request->all()));
                }

                else if ($request->source == 'GUARDIAN'){
                    //get news from The Guardian
                    $request["api_key"] = env('GUARDIANS_API_KEY','');
                    $guardianArticles = $this->articleService->getArticlesFromTheGuardian(new ArticleFetchOptions($request->all()));
                }

                $data = [
                    'nytimes_articles' =>$nyTimesArticles,
                    'opennews_articles' =>$openNewsArticles,
                    'guardian_articles' =>$guardianArticles,

                ];
                return $this->successResponse($data,'articles retrieved successfully');
            }else{
                //get news from OpenNews
                $request["api_key"] = env('OPEN_NEWS_API_KEY','');
                $openNewsArticles = $this->articleService->getArticlesFromOpenNews(new ArticleFetchOptions($request->all()));
            }

        }else{
            //get news from NY Times
            $request["api_key"] = env('NY_TIMES_API_KEY','');
            $nyTimesArticles = $this->articleService->getArticlesFromNYTimes(new ArticleFetchOptions($request->all()));

            //get news from OpenNews
            $request["api_key"] = env('OPEN_NEWS_API_KEY','');
            $openNewsArticles = $this->articleService->getArticlesFromOpenNews(new ArticleFetchOptions($request->all()));

            //get news from The Guardian
            $request["api_key"] = env('GUARDIANS_API_KEY','');
            $guardianArticles = $this->articleService->getArticlesFromTheGuardian(new ArticleFetchOptions($request->all()));

        }

        $data = [
            'nytimes_articles' =>$nyTimesArticles,
            'opennews_articles' =>$openNewsArticles,
            'guardian_articles' =>$guardianArticles,

        ];
        return $this->successResponse($data,'articles retrieved successfully');


    }
}
