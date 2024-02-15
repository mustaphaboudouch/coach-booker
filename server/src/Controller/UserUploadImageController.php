<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\UploadHandler;
use Vich\UploaderBundle\Storage\StorageInterface;
use Webmozart\Assert\Assert;

class UserUploadImageController extends AbstractController
{
    private $entityManager;
    private $uploadHandler;
    private $storage;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler, StorageInterface $storage)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
        $this->storage = $storage;
    }

    /**
     * @Route("/users/{id}/upload_image", name="user_upload_image", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): Response
    {
        $user = $this->entityManager->getRepository(User::class)->find($id);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $imageFile = $request->files->get('imageFile');
        if (!$imageFile) {
            return new JsonResponse(['error' => 'No image file provided'], Response::HTTP_BAD_REQUEST);
        }

        $oldFilePath = $this->storage->resolvePath($user, 'imageFile');
        if ($oldFilePath && file_exists($oldFilePath)) {
            $filesystem = new Filesystem();
            $filesystem->remove($oldFilePath);
        }

        $user->setImageFile($imageFile);
        $this->uploadHandler->upload($user, 'imageFile');
        $user->setImageFile(null);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Image uploaded successfully'], Response::HTTP_OK);
    }
}
