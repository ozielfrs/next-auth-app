import { CardWrapper } from '@/components/card/wrapper';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';
import { FormError } from '@/components/form/states';

const ErrorPage = () => {
  return (
    <>
      <CardWrapper
        header={<Header />}
        description={<FormError message="Something went wrong!" />}
        footer={
          <>
            <BackButton href={'/'} label={'Go back'} />
          </>
        }
      ></CardWrapper>
    </>
  );
};

export default ErrorPage;
