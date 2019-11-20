module.exports = items => {
  if (items.length >= 1) {
    return items.map(item => ({
      ...item,
      public: !!item.public
    }));
  } else {
    return {
      ...items,
      public: !!items.public
    };
  }
};
