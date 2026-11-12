type BuchenItemProps = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};

const BuchenItem = (props: BuchenItemProps) => {
  return (
    <button
      className="group flex flex-col items-center gap-4"
      onClick={props.onClick}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-500 transition-all group-hover:bg-blue-500">
        {props.icon}
      </div>
      <span>{props.title}</span>
    </button>
  );
};

export default BuchenItem;
