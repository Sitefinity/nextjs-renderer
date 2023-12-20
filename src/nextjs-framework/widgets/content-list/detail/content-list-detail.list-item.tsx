import { DetailViewModel } from './content-list-detail-model';

export function ListItemDetail(viewModel: DetailViewModel) {
    return (
      <>
        <h3>
          <span>{ viewModel.DetailItem?.Title }</span>
        </h3>

        <div>
          { viewModel.DetailItem?.Content }
        </div>
      </>
    );
}
