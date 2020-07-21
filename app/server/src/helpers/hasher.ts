import bcrypt from "bcryptjs";

class Hasher {
  public static hash = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  };
}

export default Hasher;
