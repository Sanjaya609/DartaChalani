import { RSkeleton } from '../Skeleton/RSkeleton';

export interface tableSkeletonProps {
  coloumns?: number;
}

export const TableSkeleton = (props: tableSkeletonProps) => {
  const n = 7;

  return (
    <>
      {[...Array(n)].map((e, i) => (
        <tr className="w-100" key={i}>
          {[...Array(props.coloumns)].map((e, ii) => (
            <td key={ii}>
              <RSkeleton height={'1rem'} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
