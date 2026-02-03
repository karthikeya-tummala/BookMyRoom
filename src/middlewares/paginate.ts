export const paginate = (req: any, _res: any, next: any) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1 || limit > 20) limit = 20;

  req.paginate = {
    page,
    limit,
    skip: (page - 1) * limit,
  };

  next();
};
