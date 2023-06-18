interface IParamsScrollInfinite {
  nextPage: () => void,
  conditions: boolean
}

export function ScrollInfiniteHook({ nextPage, conditions }: IParamsScrollInfinite) {
  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= (clientHeight + 50) && conditions) nextPage();
  };

  return handleScroll;
}
