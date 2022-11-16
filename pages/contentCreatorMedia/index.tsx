import { roleRequired } from '../../decorators';

export default roleRequired('contentCreator', function ContentCreatorMedia() {
  return <br />;
});
