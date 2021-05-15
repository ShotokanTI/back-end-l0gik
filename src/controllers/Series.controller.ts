import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Series } from "../entity/Series";

export const getSeries = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let allSeries = await getRepository(Series).find();
  return res.json(allSeries);
};

export const getSerie = async (
  req: Request,
  res: Response
): Promise<Object> => {
  const results = await getRepository(Series).findOne(req.params.id);
  return res.json(results);
};

export const createSeries = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (req.file != undefined) {
    //crio um objeto com o nome do arquivo que foi processado no multer
    req.body.File = req.file.filename
  }
  let result = await uniqueSeries(req.body.Nome);
  if (!result) {
    const newSerie = await getRepository(Series).create(req.body);
    const results = await getRepository(Series).save(newSerie).then(saved => {
      return res.json(saved)
    }).catch(err => {
      return res.status(400).json({ errors: [{ value: "", msg: "Não conseguimos inserir a serie,tente novamente!", location: "body" }] })
    });
    return res.json(results);
  }
  return res.status(400).json({ errors: [{ value: "", msg: "já contem na base de dados!", param: "Nome", location: "body" }] })
};

export function uniqueSeries(NomeSerie: String) {
  let series = getRepository(Series).find();
  const serieJaExiste = (serie: any) => NomeSerie === serie.Nome
  let seriesFound = series.then(serie => {
    return serie.some(serieJaExiste)
  })
  return seriesFound
}

export const updateSeries = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.file != undefined) {
    //crio um objeto com o nome do arquivo que foi processado no multer
    req.body.File = req.file.filename
  }
  const Serie = await getRepository(Series).findOne(req.params.id);
  if (Serie) {
    getRepository(Series).merge(Serie, req.body);
    const results = await getRepository(Series).save(Serie);
    return res.json(results);
  }

  return res.json({ msg: 'Not serie found' });
};

export const deleteSeries = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Series).delete(req.params.id);
  return res.json(results);
};
