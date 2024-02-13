<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['organization:read', 'service:read', 'employee:read']],
    operations: [
        new Post(),
        new Get(),
    ]
)]
class Address
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['user:read', 'user:create', 'user:update', 'organisation:read', 'organisation:update'])]
    private ?string $country = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['user:read', 'user:create', 'user:update', 'organisation:read', 'organisation:update'])]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['user:read', 'user:create', 'user:update', 'organisation:read', 'organisation:update'])]
    private ?string $street = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update', 'organisation:read', 'organisation:update'])]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: '/^\d{5}$/',
        message: 'The zip code must be a 5 digit number'
    )]
    private ?string $zip_code = null;

    #[ORM\OneToOne(mappedBy: 'address', cascade: ['persist', 'remove'])]
    #[Groups(['organisation:update'])]
    private ?Location $location = null;

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

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): static
    {
        $this->street = $street;

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

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(Location $location): static
    {
        // set the owning side of the relation if necessary
        if ($location->getAddress() !== $this) {
            $location->setAddress($this);
        }

        $this->location = $location;

        return $this;
    }
}
