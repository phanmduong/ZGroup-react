<?php
 namespace App\Pagination;
 use Illuminate\Support\HtmlString;
 use Illuminate\Pagination\UrlWindowPresenterTrait;
 use Illuminate\Contracts\Pagination\Paginator as PaginatorContract;
 use Illuminate\Contracts\Pagination\Presenter as PresenterContact;
 use Illuminate\Pagination\UrlWindow;
 use Illuminate\Pagination\BootstrapThreeNextPreviousButtonRendererTrait;
  class CustomPresenter implements PresenterContact {
       use BootstrapThreeNextPreviousButtonRendererTrait, UrlWindowPresenterTrait ;

       protected $paginator;
       protected $window;

      public function __construct(PaginatorContract $paginator, UrlWindow $window = null)
      {
          $this->paginator = $paginator;
          $this->window = is_null($window) ? UrlWindow::make($paginator, 1) : $window->get();
      }
      public function render(){
          if ($this->hasPages()) {
              return new HtmlString(sprintf(
                  '<ul class="pagination pagination-primary pagination-no-border">%s %s %s %s %s </ul>',
                  $this->getFirst('<<'),
                  $this->getPreviousButton('<'),
                  $this->getLinks(),
                  $this->getNextButton('>'),
                  $this->getLast('>>')
              ));
          }

          return '';
      }
      public function hasPages()
      {
          return $this->paginator->hasPages();
      }
      protected function getDisabledTextWrapper($text)
      {
          return '<li class="disabled"><span>'.$text.'</span></li>';
      }


      protected function getAvailablePageWrapper($url, $page, $rel = null)
      {
          $rel = is_null($rel) ? '' : ' rel="'.$rel.'"';

          return '<li ><a  href="'.htmlentities($url).'"'.$rel.'>'.$page.'</a></li>';
      }
      protected function getActivePageWrapper($text)
      {
          return '<li class="page-item"><span>'.$text.'</span></li>';
      }

      protected function getDots()
      {
          return $this->getDisabledTextWrapper('...');
      }


  }