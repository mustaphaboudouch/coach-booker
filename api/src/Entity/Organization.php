<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\OrganizationRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrganizationRepository::class)]
#[ApiResource]
class Organization
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

    #[ORM\Column(length: 255)]
    private ?string $kbis = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\OneToMany(mappedBy: 'organization_id', targetEntity: Location::class)]
    private Collection $locations_ids;

    public function __construct()
    {
        $this->locations_ids = new ArrayCollection();
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
     * @return Collection<int, Location>
     */
    public function getLocationsIds(): Collection
    {
        return $this->locations_ids;
    }

    public function addLocationsId(Location $locationsId): static
    {
        if (!$this->locations_ids->contains($locationsId)) {
            $this->locations_ids->add($locationsId);
            $locationsId->setOrganizationId($this);
        }

        return $this;
    }

    public function removeLocationsId(Location $locationsId): static
    {
        if ($this->locations_ids->removeElement($locationsId)) {
            // set the owning side to null (unless already changed)
            if ($locationsId->getOrganizationId() === $this) {
                $locationsId->setOrganizationId(null);
            }
        }

        return $this;
    }
}
