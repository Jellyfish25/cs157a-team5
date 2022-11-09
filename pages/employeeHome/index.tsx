import MediaTable from '../../components/mediaTable';

export default function EmployeeHome() {
  return (
    <MediaTable
      items={Array.from({ length: 10 }, (_, i) => ({
        name: 'SpiderMan-' + i,
        src: '/spider-man.webp',
      }))}
    />
  );
}