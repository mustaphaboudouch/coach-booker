<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AddressRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
#[ApiResource]
class Address
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $country = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    private ?string $zip_code = null;

    #[ORM\Column(length: 255)]
    private ?string $street = null;

    #[ORM\Column]
    private array $coordinates = [];

    #[ORM\OneToOne(mappedBy: 'address_id', cascade: ['persist', 'remove'])]
    private ?Location $location_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    public function setZipCode(string $zip_code): static
    {
        $this->zip_code = $zip_code;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): static
    {
        $this->street = $street;

        return $this;
    }

    public function getCoordinates(): array
    {
        return $this->coordinates;
    }

    public function setCoordinates(array $coordinates): static
    {
        $this->coordinates = $coordinates;

        return $this;
    }

    public function getLocationId(): ?Location
    {
        return $this->location_id;
    }

    public function setLocationId(Location $location_id): static
    {
        // set the owning side of the relation if necessary
        if ($location_id->getAddressId() !== $this) {
            $location_id->setAddressId($this);
        }

        $this->location_id = $location_id;

        return $this;
    }
}
