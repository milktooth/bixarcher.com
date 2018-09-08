<!DOCTYPE html>

<!-- Designed and built with Kirby CMS by Jake Brussel Faria - jakebf.com -->
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title>
      <?php echo $site->title()->html() ?>
    </title>
    <meta name="description" content="<?= $site->description()->html() ?>">

    <?= css('assets/css/main.css') ?>
      <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro" rel="stylesheet">

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  </head>

  <body>

    <section id="text-wrap">
      <p>
        <?= $page->about()->kirbytextRaw() ?>
          These are her <button class="main-toggle section-toggle" rel="gallery" type="button" name="selected works gallery">selected works<span></span></button> and this is her <button class="main-toggle section-toggle" rel="archive" type="button" name="archive">archive<span></span></button>.
      </p>
      <div class="contact">
        <span>Contact: <?= $page->contact()->kirbytextRaw()  ?></span>
      </div>
    </section>
    <section id="gallery-wrap">
      <!-- make selected works structure into array -->
      <?php $selectedWorks = yaml($page->selectedworks()) ?>

      <!-- parse array into the proper html -->
      <?php foreach($selectedWorks as $work): ?>
      <figure class="image make-drag">
        <div class="close screen"></div>
        <button class="close section-toggle"><span></span></button>
        <img src="<?= $page->image($work['image'])->resize(500)->url(); ?>">
        <figcaption>
          <span class="image-title"><?= $work['title'] ?></span>
          <span class="image-year"><?= $work['year'] ?></span>
        </figcaption>
      </figure>
      <?php endforeach ?>

    </section>
    <section id="archive-wrap">
      <button class="close section-toggle" rel="archiveclose"><span></span></button>
      <div class="table">
        <!-- convert structure to kirby objects and sort reverse chronologically  -->

        <?php
        $archive = $page->archive()->toStructure();
        $sortedArchive = $archive->sortBy('year', 'desc', 'title', 'asc');

        foreach($sortedArchive as $archiveItem): ?>
          <!-- construct as archive properly -->
          <a href="<?= $page->image($archiveItem->image())->resize(2000)->url(); ?>" target="_blank">
            <ul>
              <li>
                <?= $archiveItem->title()->html() ?>
              </li>
              <li>
                <?= $archiveItem->medium()->html() ?>
              </li>
              <li>
                <?= $archiveItem->year()->html() ?>
              </li>
            </ul>
          </a>
          <?php endforeach ?>

      </div>
    </section>

    <?= js('assets/js/main.js') ?>
  </body>

</html>
