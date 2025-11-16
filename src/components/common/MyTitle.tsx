const MyTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="relative pb-1 text-2xl font-semibold inline-block">
      {title}
      <div className="absolute bottom-0 w-2/3 h-[2px] bg-primary"></div>
    </h1>
  );
};

export default MyTitle;
