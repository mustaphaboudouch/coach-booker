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
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OrganisationRepository::class)]
#[ApiResource(
    denormalizationContext: ['groups' => ['organisation:create']],
    normalizationContext: ['groups' => ['organisation:read']],
    operations: [
        new Post(),
        new Get(),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())",
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.getId() == user.getId())
            or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())",
            securityMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'user:update'],
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'user:update:admin'],
        ),
    ],
)]
class Organisation
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['organisation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['organisation:create', 'organisation:read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['organisation:read', 'organisation:update'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/^([A-Z]{3})\d{5}$/',
        message: 'The KBIS must be a 3 capital letters followed by a 5 digit number'
    )]
    #[Groups(['organisation:create'])]
    private ?string $kbis = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['ACTIVE', 'INACTIVE'])]
    #[Groups(['organisation:update', 'organisation:read'])]
    private ?string $status = 'INACTIVE';

    #[ORM\OneToOne(inversedBy: 'organisation', cascade: ['persist', 'remove'])]
    #[Groups(['organisation:read', 'organisation:update'])]
    private ?Address $address = null;

    #[ORM\OneToMany(mappedBy: 'organisation', targetEntity: Service::class, orphanRemoval: true)]
    #[Groups(['organisation:read', 'organisation:update'])]
    private Collection $services;

    #[ORM\OneToMany(mappedBy: 'organisation', targetEntity: User::class)]
    #[Groups(['organisation:read', 'organisation:update'])]
    private Collection $users;

    public function __construct()
    {
        $this->services = new ArrayCollection();
        $this->users = new ArrayCollection();
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

    public function setDescription(?string $description): static
    {
        $this->description = $description;

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

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): static
    {
        $this->address = $address;

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
}
