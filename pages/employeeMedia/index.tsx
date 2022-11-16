import { roleRequired } from '../../decorators';

export default roleRequired('employee', function EmployeeMedia() {
  return <br />;
});
