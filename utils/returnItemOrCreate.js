module.exports = async (Model, newValue) => {
  console.log(typeof newValue);

  try {
    if (typeof newValue === 'object') {
      const { client, email } = newValue;

      const item = await Model.findOne({ name: client, email });
      if (item) {
        return item._id;
      }
      const newItem = new Model({ name: client, email });
      await newItem.save();
      return newItem._id;
    } else {
      const item = await Model.findOne({ name: newValue });
      if (item) {
        return item._id;
      }
      const newItem = new Model({ name: newValue });
      await newItem.save();
      return newItem._id;
    }
  } catch (error) {
    return new Error(error);
  }
};
