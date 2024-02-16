<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LocationRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LocationRepository::class)]
#[ApiResource]
class Location
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $photos = [];

    #[ORM\ManyToOne(inversedBy: 'locations_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Organization $organization_id = null;

    #[ORM\OneToOne(inversedBy: 'location_id', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Address $address_id = null;

    #[ORM\OneToMany(mappedBy: 'location_id', targetEntity: UserLocation::class)]
    private Collection $user_locations_ids;

    public function __construct()
    {
        $this->user_locations_ids = new ArrayCollection();
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

    public function getPhotos(): array
    {
        return $this->photos;
    }

    public function setPhotos(array $photos): static
    {
        $this->photos = $photos;

        return $this;
    }

    public function getOrganizationId(): ?Organization
    {
        return $this->organization_id;
    }

    public function setOrganizationId(?Organization $organization_id): static
    {
        $this->organization_id = $organization_id;

        return $this;
    }

    public function getAddressId(): ?Address
    {
        return $this->address_id;
    }

    public function setAddressId(Address $address_id): static
    {
        $this->address_id = $address_id;

        return $this;
    }

    /**
     * @return Collection<int, UserLocation>
     */
    public function getUserLocationsIds(): Collection
    {
        return $this->user_locations_ids;
    }

    public function addUserLocationsId(UserLocation $userLocationsId): static
    {
        if (!$this->user_locations_ids->contains($userLocationsId)) {
            $this->user_locations_ids->add($userLocationsId);
            $userLocationsId->setLocationId($this);
        }

        return $this;
    }

    public function removeUserLocationsId(UserLocation $userLocationsId): static
    {
        if ($this->user_locations_ids->removeElement($userLocationsId)) {
            // set the owning side to null (unless already changed)
            if ($userLocationsId->getLocationId() === $this) {
                $userLocationsId->setLocationId(null);
            }
        }

        return $this;
    }
}
