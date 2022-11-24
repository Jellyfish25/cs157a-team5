import Image from 'next/image';
import { useState } from 'react';
import styles from './MediaTable.module.css';

interface MediaSummaryProps {
  name: string;
  src: string;
}

interface MediaTableProps {
  items: MediaSummaryProps[];
}

export function MediaTable({ items }: MediaTableProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <div className={styles.container}>
      {items.slice(page * 8, page * 8 + 8).map(({ name, src }) => (
        <MediaSummary key={name + src} name={name} src={src} />
      ))}
    </div>
  );
}

function MediaSummary({ name, src }: MediaSummaryProps) {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.imgContainer}>
        <Image src={src} alt={name} layout='fill' objectFit='contain' />
      </div>
      <div className={styles.summary}>
        <p>$1.99</p>
        <p>4/5 Stars</p>
      </div>
    </div>
  );
}

function MediaRows(items: MediaSummaryProps[]): JSX.Element {
  if (items.length == 0) {
  }
  return (
    <>
      <tr>
        {items.slice(0, 4).map(({ name, src }) => (
          <MediaSummary key={name + src} name={name} src={src} />
        ))}
      </tr>
      {MediaRows(items.slice(4, items.length))}
    </>
  );
}
