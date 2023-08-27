type GetClassNameParams = Array<
| Record<string, unknown>
| string
| boolean
| undefined
| null
>;

export const getClassName = (...classNames: GetClassNameParams) => {
  const result = [] as string[];

  for (let i = 0; i < classNames.length; i++) {
    const currentItem = classNames[i];
    const isObject = typeof currentItem === 'object' && !Array.isArray(currentItem) && currentItem !== null;

    if (isObject) {
      for (const className in currentItem) {
        const currentClassName = currentItem[className]
        if (!!currentClassName && typeof currentClassName === 'string') {
          result.push(currentClassName)
        }
      }
    }

    if (!!currentItem && typeof currentItem === 'string') {
      result.push(currentItem);
    }
  }

  return result.join(' ');
};
