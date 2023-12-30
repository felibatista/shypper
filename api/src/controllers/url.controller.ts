import { NextFunction, Request, Response } from "express";
import {
  checkUrlExists,
  checkUrlValid,
  create,
  createRandomUrl,
} from "../services/url.service";

export const createUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const url = body.url;
    const name = body.name;
    
    if (!name || !url) {
      throw new Error("Please provide all the fields");
    }

    if (checkUrlValid(url)) {
      throw new Error("Please provide a valid URL");
    }

    let categories = [];

    if (body.categories) {
      categories = body.categories.map((category: string) => {
        return {
          name: category,
        };
      });
    }

    const token = req.headers.token as string;
    //const user = await getUserFromToken(token);

    if (!token) {
      throw new Error("Please provide token");
    }

    let random = createRandomUrl();

    while (await checkUrlExists(random) !== null) {
      random = createRandomUrl();
    }

    const generatedUrl = await create(
      name,
      url,
      random,
      1, //userid
      categories
    );

    res.status(200).json({
      status: "success",
      message: generatedUrl,
    });
  } catch (err: any) {
    next(err);
  }
};
