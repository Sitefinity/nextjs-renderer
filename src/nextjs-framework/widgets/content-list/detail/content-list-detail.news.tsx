import { DetailViewModel } from './content-list-detail-model';

export function NewsItemDetail(viewModel: DetailViewModel) {
    const author = viewModel.DetailItem.Author;
    return (
      <>
        <h3>
          <span>{ viewModel.DetailItem?.Title }</span>
        </h3>

        <div>
          { viewModel.DetailItem?.PublicationDate }
          { author && `By ${author}` }
        </div>

        <div>{ viewModel.DetailItem?.Summary }</div>

        <div>{ viewModel.DetailItem?.Content }</div>
      </>
    );
}
