import { NextResponse } from "next/server";

import Categories from "models/Categories";
import auth from "middleware/auth";
import db from "lib/db";
import sendError from "utils/sendError";

export const DELETE = auth(async (req, { params }) => {
  try {

    const { id } = params;

    await db.connect();
    await Categories.findByIdAndDelete(id);
    await db.disconnect();

    return NextResponse.json({
      msg: '删除成功'
    }, {
      status: 200
    })
  } catch (error) {
    return sendError(500, error.message);
  }
});

export const PUT = auth(async (req, { params }) => {
  try {

    const { id } = params;
    const { name } = await req.json();
    await db.connect();
    const newCategory = await Categories.findByIdAndUpdate(
      { _id: id },
      { name }
    );
    await db.disconnect();
    
    return NextResponse.json({
      msg: '更新成功'
    }, {
      status: 200
    })
  } catch (error) {
    console.log('error', error)
    return sendError(500, error.message);
  }
})
