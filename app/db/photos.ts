import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function getPhotoJSONFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.json');
}

function readJSONFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawContent);
}

function getJSONData(dir) {
  let jsonFiles = getPhotoJSONFiles(dir);
  return jsonFiles.map((file) => {
    let data = readJSONFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));
    return {
      title: data.title,
      content: data.content,
      publishedAt: data.publishedAt,
      slug: slug,
      images: data.images,
    };
  });
}

export function getPhotoPosts() {
  return getJSONData(path.join(process.cwd(), 'photos'));
}
