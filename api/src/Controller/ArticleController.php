<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\UploadHandler;

class ArticleController extends AbstractController
{
    private $entityManager;
    private $uploadHandler;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $article = new Article();
        $article->setTitle($request->request->get('title'));

        if ($request->files->has('file')) {
            $file = $request->files->get('file');
            $article->setFile($file);
            $this->uploadHandler->upload($article, 'file');
            $article->setFile(null); // Optional: reset file to not serialize it
        }

        $this->entityManager->persist($article);
        $this->entityManager->flush();

        // Assuming you want to return a JSON response
        return new JsonResponse(
            // You can customize the data you want to return here
            ['id' => $article->getId()],
            Response::HTTP_CREATED
        );
    }
}
