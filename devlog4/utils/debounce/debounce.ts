export function debounce<T, R>(func: (args: T) => R, delay: number, prevTimer?: NodeJS.Timeout) {
    let timer: NodeJS.Timeout | undefined = prevTimer;
  
    return (args: T) => {
      clearTimeout(timer);
      return (timer = setTimeout(() => {
        func(args);
      }, delay));
    };
  }
  