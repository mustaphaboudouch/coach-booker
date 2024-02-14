<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Repository\OrganisationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OrganisationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['organisation:get:collection']]
        ),
        new Get(
            normalizationContext: ['groups' => ['organisation:get']]
        ),
        new Patch(
            denormalizationContext: ['groups' => ['organisation:patch']]
        ),
        new Post()
    ],
)]
class Organisation
{
    use TimestampableEntity;

    #[Groups(['organisation:get:collection', 'organisation:get'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['organisation:get:collection', 'organisation:get', 'organisation:patch', 'user:post'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $name = null;

    #[Groups(['organisation:get:collection', 'organisation:get', 'organisation:patch', 'user:post'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/^([A-Z]{3})\d{5}$/',
        message: 'The KBIS must be a 3 capital letters followed by a 5 digit number'
    )]
    private ?string $kbis = null;

    #[Groups(['organisation:get:collection', 'organisation:get', 'organisation:patch'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['ACTIVE', 'INACTIVE', 'DELETED'])]
    private ?string $status = null;

    #[ORM\OneToMany(mappedBy: 'organisation', targetEntity: Service::class, orphanRemoval: true)]
    private Collection $services;

    #[ORM\OneToMany(mappedBy: 'organisation', targetEntity: User::class)]
    private Collection $users;

    #[ORM\OneToMany(mappedBy: 'organisation', targetEntity: Location::class, orphanRemoval: true)]
    private Collection $locations;

    public function __construct()
    {
        $this->services = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->locations = new ArrayCollection();
        $this->status = 'ACTIVE';
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

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

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

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setOrganisation($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getOrganisation() === $this) {
                $service->setOrganisation(null);
            }
        }

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
            $user->setOrganisation($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getOrganisation() === $this) {
                $user->setOrganisation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Location>
     */
    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(Location $location): static
    {
        if (!$this->locations->contains($location)) {
            $this->locations->add($location);
            $location->setOrganisation($this);
        }

        return $this;
    }

    public function removeLocation(Location $location): static
    {
        if ($this->locations->removeElement($location)) {
            // set the owning side to null (unless already changed)
            if ($location->getOrganisation() === $this) {
                $location->setOrganisation(null);
            }
        }

        return $this;
    }
}
