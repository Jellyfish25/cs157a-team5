import { roleRequired } from '../../decorators';

export default roleRequired('contentCreator', function DeleteMedia() {
  return <br />;
});
