<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Exception;
use Resend;
use SendinBlue\Client\Api\EmailCampaignsApi;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Model\CreateEmailCampaign;
use SendinBlue\Client\Model\SendSmtpEmail;

class UserSubscriber implements EventSubscriberInterface
{
    public function onInscriptionSuccess(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$entity instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $this->sendSubscriptionEmail($entity->getEmail());
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onInscriptionSuccess', EventPriorities::POST_WRITE],
        ];
    }


    private function sendSubscriptionEmail(String $email): void
    {
        $sendInBlueApiKey = $_ENV['SENDINBLUE_API_KEY'];

        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $sendInBlueApiKey);
        $apiInstance = new TransactionalEmailsApi(null, $config);

        $htmlContent = '<html><body><h1>Hello!</h1><p>This is a test transactional email from the Transactional Email API.</p></body></html>';

        // Create an instance of SendSmtpEmail
        $sendSmtpEmail = new SendSmtpEmail([
            'sender' => ['email' => 'coachbooker@mycompany.com', 'name' => 'Coach Booker'],
            'to' => [['email' => 'ali.fatoori@gmail.com']],
            'htmlContent' => $htmlContent,
            'subject' => 'Confirmation',
        ]);

        try {
            $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            echo 'Exception when calling TransactionalEmailsApi->sendTransacEmail: ', $e->getMessage(), PHP_EOL;
        }
    }
}
