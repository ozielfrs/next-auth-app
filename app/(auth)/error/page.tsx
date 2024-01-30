import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';
import { CardWrapper } from '@/components/card/wrapper';
import { FormError } from '@/components/form/states';

const ErrorPage = () => {
  return (
    <CardWrapper
      header={<Header />}
      footer={<BackButton href={'/'} label={'Go back'} />}
    >
      <FormError message="Something went wrong!" />
    </CardWrapper>
  );
};

export default ErrorPage;
