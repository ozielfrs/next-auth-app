import { UserInfo } from '@/components/auth/user/info';
import { currentuser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await currentuser();

  return <UserInfo label="Server Component" user={user} />;
};

export default ServerPage;
