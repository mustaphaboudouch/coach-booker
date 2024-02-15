<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\LocationUploadImageController;
use App\Repository\LocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;

#[ORM\Entity(repositoryClass: LocationRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['location:get:collection']]
        ),
        new Post(
            denormalizationContext: ['groups' => ['location:post']]
        ),
        new Patch(
            denormalizationContext: ['groups' => ['location:patch']]
        ),
        new Patch(
            uriTemplate: '/locations/{id}/users-update',
            denormalizationContext: ['groups' => ['location:patch:user']]
        ),
        new Post(
            uriTemplate: '/locations/{id}/upload-image',
            controller: LocationUploadImageController::class,
            denormalizationContext: ['groups' => ['location:upload:image']],
            defaults: ['_api_receive' => false], // Prevent API Platform from trying to deserialize the request body
            name: 'location_upload_image',
        ),
    ],
)]
class Location
{
    #[Groups(['location:get:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['location:get:collection', 'location:post', 'location:patch', 'appointment:get'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[Groups(['location:get:collection', 'location:post', 'location:patch'])]
    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    private ?string $description = null;

    #[Groups(['location:patch'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['ACTIVE', 'DELETED'])]
    private ?string $status = null;

    #[Groups(['location:post'])]
    #[ORM\ManyToOne(inversedBy: 'locations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Organisation $organisation = null;

    #[Groups(['location:get:collection', 'location:post', 'location:patch'])]
    #[ORM\OneToOne(inversedBy: 'location', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Address $address = null;

    #[Groups(['location:get:collection', 'location:patch:user'])]
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'locations', cascade: ['persist'])]
    private Collection $users;

    #[ORM\OneToMany(mappedBy: 'location', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $appointments;

    #[Groups(['location:upload:image'])]
    #[Vich\UploadableField(mapping: 'booker_image', fileNameProperty: 'imagePath')]
    private ?File $imageFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePath = null;

    public function __construct()
    {
        $this->status = 'ACTIVE';
        $this->users = new ArrayCollection();
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile): void
    {
        $this->imageFile = $imageFile;
    }

    public function getOrganisation(): ?Organisation
    {
        return $this->organisation;
    }

    public function setOrganisation(?Organisation $organisation): static
    {
        $this->organisation = $organisation;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(Address $address): static
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addLocation($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeLocation($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setLocation($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getLocation() === $this) {
                $appointment->setLocation(null);
            }
        }

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): static
    {
        $this->imagePath = $imagePath;

        return $this;
    }
}
