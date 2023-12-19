import { DetailViewModel } from './content-list-detail-model';

export function BlogPostDetail(viewModel: DetailViewModel) {
    return (<>
      <h3>
        <span>{ viewModel.DetailItem?.Title }</span>
      </h3>

      <div>
        { viewModel.DetailItem?.PublicationDate }
      </div>

      <div>{ viewModel.DetailItem?.Summary }</div>

      <div>{ viewModel.DetailItem?.Content }</div>
    </>
    );
}
