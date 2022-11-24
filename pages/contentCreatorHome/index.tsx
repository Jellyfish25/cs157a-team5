import { MediaTable } from '../../components';
import { roleRequired } from '../../decorators';

export default roleRequired('contentCreator', function ContentCreatorHome() {
  return (
    <MediaTable
      items={Array.from({ length: 10 }, (_, i) => ({
        name: 'SpiderMan-' + i,
        src: '/spider-man.webp',
      }))}
    />
  );
});
