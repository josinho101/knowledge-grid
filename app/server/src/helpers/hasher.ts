import bcrypt from "bcryptjs";

class Hasher {
  public static hash = async (data: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  };

  public static compare = async (plain: string, encrypted: string) => {
    return await bcrypt.compare(plain, encrypted);
  };
}

export default Hasher;
