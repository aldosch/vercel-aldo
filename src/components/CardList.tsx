// Props interface
interface Item {
  id: number;
  heading: string;
  subHeading?: string;
}

interface Props {
  items: Item[];
}

export default function CardList({ items }: Props) {
  return (
    <ul role="list" className="space-y-3">
      {items?.map((item) => (
        <li key={item.id}>
          <div className="flex items-center px-6 py-6 space-x-6 bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 rounded-xl hover:cursor-pointer">
            <span>{item.id}</span>
            <div className="prose">
              <h3>{item.subHeading}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
