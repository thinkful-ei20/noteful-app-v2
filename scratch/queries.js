'use strict';

const knex = require('../knex');

knex.select()
  .from('notes')
  .where('id', 1005)
  .then(([data]) => {
    console.log(data.id);
    console.log(data.title);
    console.log(data.content);
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    knex.destroy();
  });

let searchTerm = 'gaga';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

knex
  .select('notes.id', 'notes.title',
    'folder_id as folderId', 'folders.name as folderName',
    'notes_tags.tag_id', 'tags.name as tagName')
  .from('notes')
  .leftJoin('folders', 'notes.folderId', 'folders.id')
  .leftJoin('notes_tags', 'notes.id', 'notes_tags.note_id')
  .leftJoin('tags', 'notes_tags.tag_id', 'tags.id')
  .where('notes.id', 1004)
  .then(results => {
    console.log(results);
  })
  .catch(err => {
    console.error(err);
  });