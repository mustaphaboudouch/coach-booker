<?php

namespace App\Controller;

use App\Entity\Organisation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\UploadHandler;
use Vich\UploaderBundle\Storage\StorageInterface;

class OrganisationUploadImageController extends AbstractController
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
     * @Route("/organisation/{id}/upload_image", name="organisation_upload_image", methods={"POST"})
     */
    public function __invoke(Request $request, int $id): Response
    {
        $organisation = $this->entityManager->getRepository(Organisation::class)->find($id);
        if (!$organisation) {
            return new JsonResponse(['error' => 'Organisation not found'], Response::HTTP_NOT_FOUND);
        }

        $imageFile = $request->files->get('imageFile');
        if (!$imageFile) {
            return new JsonResponse(['error' => 'No image file provided'], Response::HTTP_BAD_REQUEST);
        }

        $oldFilePath = $this->storage->resolvePath($organisation, 'imageFile');
        if ($oldFilePath && file_exists($oldFilePath)) {
            $filesystem = new Filesystem();
            $filesystem->remove($oldFilePath);
        }

        $organisation->setImageFile($imageFile);
        $this->uploadHandler->upload($organisation, 'imageFile');
        $organisation->setImageFile(null);

        $this->entityManager->persist($organisation);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Image uploaded successfully'], Response::HTTP_OK);
    }
}
