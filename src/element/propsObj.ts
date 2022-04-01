const propsObj = {
  block: String,
  elem: String,
  mods: {
    type: Object,
    default: (): Record<string, unknown> => ({}),
  },

  type: String,

  background: String,
  color: String,
  icon: String,
  border: String,
  href: String,
  font: String,
  fontWeight: String,
  cursor: String,
};

export default propsObj;
