const getConOrCreateFromString = (input: string) => {
  return (
    input
      .split(",")
      .filter((c: any) => c.length !== 0)
      .map((item: string) => {
        return {
          where: {
            name: item,
          },
          create: {
            name: item,
          },
        };
      }) || []
  );
};

export { getConOrCreateFromString };
