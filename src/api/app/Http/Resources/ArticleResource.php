<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    public static function mapNYTimesResponse(mixed $articles):array{
        $data = [];
        foreach ($articles as $article){
            array_push($data,[
                'title'=>$article["abstract"],
                'image'=>$article["multimedia"][0]["url"] ?? null,
                'source'=>$article["source"],
                'url'=> $article["web_url"]
            ]);
        };

        return $data;
    }

    public static function mapOpenNewsResponse(mixed $articles):array{
        $data = [];
        foreach ($articles as $article){
            array_push($data,[
                'title'=>$article["title"],
                'image'=>$article["urlToImage"] ?? null,
                'source'=>$article["source"]["name"],
                'url'=> $article["url"],
                'date_published'=> $article["publishedAt"]
            ]);
        };

        return $data;
    }

    public static function mapTheGuardianResponse(mixed $articles):array{
        $data = [];
        foreach ($articles as $article){
            array_push($data,[
                'title'=>$article["webTitle"],//webTitle
                'image'=>$article["urlToImage"] ?? null,
                'source'=>'The Guardian',
                'url'=> $article["webUrl"],
                'date_published'=> $article["webPublicationDate"]
            ]);
        };

        return $data;
    }
}
